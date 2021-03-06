/**
 * @module DashContainer.tsx
 * @description Dashboard Container for User 
 */

import * as React from 'react';

import IssuesContainer from './IssuesContainer';
import SurveyContainer from '../components/survey/SurveyContainer';
import QuadsContainer from './QuadsContainer';
import Loading from '../components/loading/Loading';

const DashContainer = (props: any): any => {
  const {
    issues, issuesComplete, loading, surveyComplete,
    fetchIssues,
  } = props.userState;

  // Check if issues and survey are already complete
  if (!issuesComplete || !surveyComplete) {
    if (!Object.keys(issues).length || loading.issuesLoading || loading.surveyLoading) {
      if (!loading.issuesLoading && !Object.keys(issues).length) fetchIssues();
      return <Loading loadingMessage="Calculating" />
    };
    return issuesComplete ? <SurveyContainer /> : <IssuesContainer />;
  }

  return <QuadsContainer />
};

export default DashContainer;
