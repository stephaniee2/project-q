/**
 * ************************************
 *
 * @module  controllers/addQuestionDataToDb.ts
 * @author Team Quail
 * @date 
 * @description middleware to create question entries in the db
 *
 * ************************************
 */

import { Request, Response, NextFunction } from 'express';
// import db and db functionality from modular files to access db methods
import db from '../index';

const DatabaseMethods: any = {};

// adds questions data to the questions table
DatabaseMethods.insertQuestions = (req: Request, _: Response, next: NextFunction) => {
  // db.users accesses methods defined in company controller
  db.data.addQuestions(req.body)
    .then(() => {
      next();
    })
    .catch((error: any) => {
      console.log('ERROR AT INSERT DATA IN addQuestionToDb', error);
    });
}

// inserts issue data
DatabaseMethods.insertIssues = (req: Request, _: Response, next: NextFunction) => {
  db.data.addIssues(req.body)
    .then(() => {
      next();
    })
    .catch((error: any) => {
      console.log('ERROR AT insertIssues IN addQuestionToDb', error);
    });
}

// gets all issue data
DatabaseMethods.getIssues = (_: Request, res: Response, next: NextFunction) => {
  // declare object to return to the front end
  res.locals.issues = {};

  // query db for issue data
  db.data.getIssues()
    .then((issueData: any[]) => {
      // for each issue object, build out the response object
      issueData.forEach((issueObject: any) => {
        res.locals.issues[issueObject.id] = {}
        res.locals.issues[issueObject.id].issueId = issueObject.id;
        res.locals.issues[issueObject.id].issueName = issueObject.issue_name;
        res.locals.issues[issueObject.id].issueBlurb = issueObject.description;
      })
      // move on to end response and deliver issues object
      // res.locals.issues = {issueId: { issueId: string, issueName: string, issueBlurb: string}}
      next();
    })
    .catch((error: any) => {
      console.log('ERROR AT insertIssues IN addQuestionToDb', error);
    });
}

// get issue abbreviated names
DatabaseMethods.getIssueAbbrvs = (_: Request, res: Response, next: NextFunction) => {
  // if request has failed in prior middleware
  if (res.locals.status === 500) next();

  // declare object to return to the front end
  res.locals.issueAbbrvs = {};
  // query db for issue data
  db.data.getIssueAbbrvs()
    .then((issueData: any[]) => {
      // for each issue object, build out the response object
      issueData.forEach((issueObject: any) => {
        res.locals.issueAbbrvs[issueObject.issue_name] = issueObject.abbrv;
      })
      // move on to end response and deliver issues object
      // res.locals.issues = {issueId: { issueId: string, issueName: string, issueBlurb: string}}
      next();
    })
    .catch((error: any) => {
      console.log('ERROR AT insertIssues IN addQuestionToDb', error);
    });
}

DatabaseMethods.insertPoliticianData = (req: Request, _: Response, next: NextFunction) => {
  db.data.insertPoliticianData(req.body)
    .then(() => {
      next();
    })
}

DatabaseMethods.updatePolictianData = (req: Request, _: Response, next: NextFunction) => {
  db.data.updatePoliticianData(req.body)
  .then(() => {
    next();
  })
}

DatabaseMethods.getPoliticianData = (_: Request, res: Response, next: NextFunction) => {


  db.data.getPoliticianData(res.locals.companyData)
    .then((politicianData: any) => {
      res.locals.modules = {};
      res.locals.modules.politicianData = politicianData;
      res.locals.modules.moduleData = res.locals.moduleData
      next();
    })
}

DatabaseMethods.getSinglePoliticianData = (req: Request, res: Response, next: NextFunction) => {
  db.data.getSinglePoliticianData(req.body.ticker)
  .then((politicianData: any) => {
    if (politicianData.recip_1 === ''){
      res.locals.politicianData = {};
    }
    else {
      res.locals.politicianData = politicianData;
    }
    next();
  }) 
}

DatabaseMethods.parseCSV = (req: Request, res: Response, next: NextFunction) => {
    // there should be some type of file in the req.body, likely a csv
    // extract ticker data from csv, maybe holding amount 
    // stash ticker data and holding amount, maybe, in res.locals.userPortfolio and pass it along
    console.log(req.body);
    console.log(res.locals);
    next();
}



export default DatabaseMethods;