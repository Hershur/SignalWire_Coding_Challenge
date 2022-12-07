import { Router } from 'express';
import axios from 'axios';
import { insertTags, insertTickets } from '../../../database/data/user-tickets';
import { IFieldValidator, IUserDetails } from '../../../models';
import httpHelpers from '../../../utils/httpHelpers';
import { validateUserDetails } from '../../../utils/validators';


const buildValidators: IFieldValidator[] = [
  {
    fieldName: 'user_id',
    type: Number,
    required: true,
  },
  {
    fieldName: 'title',
    type: String,
    required: true,
  },
  {
    fieldName: 'tags',
    type: Array,
    required: false,
    maxLength: 4,
  },
];


export const router = Router();

router.post('/tickets', async (req, res) => {

  const { valid, errors } = validateUserDetails(req.body, buildValidators);

  if(!valid) {
    return httpHelpers.respondWith422UnprocessableEntity(res, { success: false, message: 'Invalid Request', errors });
  }

  const user_id = req.body.user_id;
  const title = req.body.title;
  const tags: string[] = req.body.tags && req.body.tags.map((t: string) => t?.toLowerCase());

  // insert tickets
  const valuesTickets = [user_id, title];
  const valuesTags = [user_id, tags];

  const [ticketsResponse, tagsResponse] = await Promise.all([
    await insertTickets(valuesTickets),
    tags?.length > 0 && await insertTags(valuesTags)
  ]);



  if(ticketsResponse.success){

    // post to webhook url if tags are present
    if(tagsResponse && tagsResponse.success){
      const payload = { tagName: tagsResponse.response?.tag, count: tagsResponse.response?.count };
      await axios.post('https://webhook.site/67baa13a-50e9-46cc-8cb0-e19d2d61259d', payload);
    }
    
    return httpHelpers.respondWith200OkJson(res, { success: true, message: 'Inserted successfully', data: ticketsResponse.response });
  } else {
    return httpHelpers.respondWith400BadRequest(res, { success: false, message: 'An error occured', errors: ticketsResponse.error || (tagsResponse && tagsResponse.error) });
  }
  
    
});
