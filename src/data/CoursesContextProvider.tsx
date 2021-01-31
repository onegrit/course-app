import React, { useState } from "react";
import CourseContext, { Course, Goal } from "./courses-context";

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

  const addGoal = (courseId: string, text: string) => {
    const newGoal: Goal = {
      id: Math.random().toString(),
      text,
    };

    setCourses((curCourses) => {
      const updatedCourses = [...curCourses];
      const updatedCourseIdx = updatedCourses.findIndex(
        (c) => c.id === courseId
      );
      const updatedCourseGoals = updatedCourses[updatedCourseIdx].goals.concat(
        newGoal
      );
      const updatedCourse = { ...updatedCourses[updatedCourseIdx] };
      updatedCourse.goals = updatedCourseGoals;
      updatedCourses[updatedCourseIdx] = updatedCourse;

      return updatedCourses;
    });
  };

  const deleteGoal = (courseId: string, goalId: string) => {
    setCourses((curCourses) => {
      const updatedCourses = [...curCourses];
      const updatedCourseIdx = updatedCourses.findIndex(
        (course) => course.id === courseId
      );
      const updatedCourseGoals = updatedCourses[updatedCourseIdx].goals.filter(
        (goal) => goal.id !== goalId
      );
      const updatedCourse = { ...updatedCourses[updatedCourseIdx] };
      updatedCourse.goals = updatedCourseGoals;
      updatedCourses[updatedCourseIdx] = updatedCourse;

      return updatedCourses;
    });
  };

  const updateGoal = (courseId: string, goalId: string, newText: string) => {
    setCourses((curCourses) => {
      const updatedCourses = [...curCourses];
      const updatedCourseIdx = updatedCourses.findIndex(
        (course) => course.id === courseId
      );
      const updatedCourse = { ...updatedCourses[updatedCourseIdx] };

      const updatedCourseGoals = updatedCourse.goals.slice();
      const updatedCourseGoalIdx = updatedCourseGoals.findIndex(
        (goal) => goal.id === goalId
      );
      const updatedCourseGoal = {
        ...updatedCourseGoals[updatedCourseGoalIdx],
        text: newText,
      };
      updatedCourseGoals[updatedCourseGoalIdx] = updatedCourseGoal;
      updatedCourse.goals = updatedCourseGoals;
      updatedCourses[updatedCourseIdx] = updatedCourse;

      return updatedCourses;
    });
  };
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
