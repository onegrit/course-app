import React, { useState } from "react";
import CourseContext, { Course } from "./courses-context";

const CoursesContextProvider: React.FC = (props) => {
  const [courses, setCourses] = useState<Course[]>([]);

  const addCourse = (title: string, date: Date) => {
    const newCourse: Course = {
      id: Math.random().toString(),
      title,
      enrolled: date,
      goals: [],
    };

    setCourses((curCourses) => curCourses.concat(newCourse));
  };

  const addGoal = () => {};
  const deleteGoal = () => {};
  const updateGoal = () => {};
  return (
    <CourseContext.Provider
      value={{
        courses,
        addCourse,
        addGoal,
        deleteGoal,
        updateGoal,
      }}
    >
      {props.children}
    </CourseContext.Provider>
  );
};

export default CoursesContextProvider;
