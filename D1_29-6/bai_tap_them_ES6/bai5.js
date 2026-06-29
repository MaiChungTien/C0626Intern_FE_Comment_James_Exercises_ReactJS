// Bài 5: Sử dụng cú pháp ES6 để xuất ra màn hình danh sách các bài đăng có rating < 4:
// Yêu cầu giá trị các phần tử của mảng mới có định dạng: <id> - <title> - <rating>
let courses = [
  {
    id: 1,
    title: "ReactJS Tutorial",
    rating: 4.2,
  },
  {
    id: 2,
    title: "Angular Tutorial",
    rating: 2.5,
  },
  {
    id: 3,
    title: "VueJS Tutorial",
    rating: 3.8,
  },
  {
    id: 4,
    title: "Java Tutorial",
    rating: 4,
  },
  {
    id: 5,
    title: "JavaScript Tutorial",
    rating: 3.5,
  },
];

const lowRatedCourses = courses
  .filter((course) => course.rating < 4)
  .map((course) => `${course.id} - ${course.title} - ${course.rating}`);
console.log(lowRatedCourses);
