import * as Joi from 'joi';
export const createHotelSchema = Joi.object({
  name: Joi.string().required(),
  hotelId: Joi.string().required(),
  image: Joi.object(),
  descript: Joi.string().min(0),
});
