import Student from "../models/Student.model.js";
import { errorHandle } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandle(403, "Yor are not alowed to create a student"));
  }

  const { Id, name, image, age, status } = req.body;

  const newStudent = new Student({
    Id,
    name,
    image,
    age,
    status,
  });
  try {
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    next(error);
  }
};

export const getStudents = async (req, res, next) => {
  try {
    const isAdmin = req.user.isAdmin;

    if (isAdmin) {
      console.log(isAdmin);

      const students = await Student.find();

      if (students.length > 0) {
        res.json({
          message: "student details retrieved successfully",
          students,
        });
      } else {
        return next(errorHandle(404, " student not fonud "));
      }
    }
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};

export const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find();

    if (students.length > 0) {
      res.json({ message: "student details retrieved successfully", students });
    } else {
      return next(errorHandle(404, " student not fonud "));
    }
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};

export const deleteStudent = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandle(403, "You are not allowed to delete this post"));
  }
  try {
    await Student.findByIdAndDelete(req.params.StudentId);
    res.status(200).json("The post has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandle(403, "Your are not allow to udate this posts"));
  }
  try {
    const updateStudent = await Student.findByIdAndUpdate(
      req.params.StudentId,
      {
        $set: {
          Id: req.body.Id,
          name: req.body.name,
          image: req.body.image,
          age: req.body.age,
          status: req.body.status,
        },
      },
      { new: true }
    );
    res.status(200).json(updateStudent);
  } catch (error) {
    next(error);
  }
};

export const updateStudentStatus = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(
        errorHandle(403, "You are not allowed to update student status")
      );
    }

    const { studentId } = req.params;
    const { status } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { status },
      { new: true }
    );

    if (!updatedStudent) {
      return next(errorHandle(404, "Student not found"));
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    next(error);
  }
};
