import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { list, trophyOutline } from "ionicons/icons";
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import AllGoals from "./AllGoals";
import CourseGoals from "./CourseGoals";
import Courses from "./Courses";

const CourseTabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect path="/courses" to="/courses/list" exact />
        <Switch>
          <Route path="/courses/list" exact>
            <Courses />
          </Route>
          <Route path="/courses/all-goals" exact>
            <AllGoals />
          </Route>
          <Route path="/courses/:courseId">
            <CourseGoals />
          </Route>
        </Switch>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton href="/courses/all-goals" tab="all-goals">
          <IonIcon icon={list} />
          <IonLabel>All Goals</IonLabel>
        </IonTabButton>
        <IonTabButton href="/courses/list" tab="courses">
          <IonIcon icon={trophyOutline} />
          <IonLabel>Courses</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default CourseTabs;
