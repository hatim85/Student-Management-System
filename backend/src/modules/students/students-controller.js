const asyncHandler = require("express-async-handler");
const debug = require('debug')('app:students'); // 'app:students' is a namespace
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const students = await getAllStudents(req);
    res.json({students});

});

const handleAddStudent = asyncHandler(async (req, res) => {
    try {
        const result = await addNewStudent(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }


});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const {id :payload} = req.params
   const message = await updateStudent(payload);
   res.json({message});
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const student = await getStudentDetail(id);
    res.json({student});

});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;
    const payload = {
        ...req.body,
        userId
    };

    const message  = await setStudentStatus(payload);
    res.json({message});


});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};