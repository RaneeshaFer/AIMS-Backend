import express from 'express';
import {getAllAppointments,postAppointment,deleteAppointment,updateAppointment} from '../controllers/AppointmentController.js';

let appointmentRouter = express.Router();

appointmentRouter.get('/', getAllAppointments)
appointmentRouter.post('/', postAppointment)
appointmentRouter.delete('/:aid', deleteAppointment)
appointmentRouter.put('/:aid', updateAppointment)

export default appointmentRouter
