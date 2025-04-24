import express from 'express';
import { getAllTeachers } from '../controllers/TeacherController.js';

let teacherRouter=express.Router();

teacherRouter.get('/',getAllTeachers)
export default teacherRouter