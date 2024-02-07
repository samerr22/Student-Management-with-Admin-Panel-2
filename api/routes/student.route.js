import  express  from "express";
import { verifyToken } from '../utils/VerfiyUser.js';
import { create, deleteStudent, getAllStudents, getStudents,  updateStudent, updateStudentStatus } from "../controllers/student.controller.js";

const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getstudents',verifyToken, getStudents);
router.get('/getAllstudents', getAllStudents);
router.put('/student/:studentId/status',verifyToken, updateStudentStatus);
router.delete('/deleteStudent/:StudentId', verifyToken, deleteStudent)
router.put('/updateStudent/:StudentId', verifyToken, updateStudent)

export default router;