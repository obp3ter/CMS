import {Review} from "@app/shared/models/review.model";

export class Proposal{
  id:number;
  authorID:number;
  abstractFileName:string;
  paperFileName:string;
  proposalName:string;
  keyWords:string;
  topics:string;
  listOfAuthors:string;
  reviewers:number[];
  refusers:number[];
  assignedReviewers:number[];
  reviews:Array<Review> ;
}

// private Integer id;
// private Integer authorID;
// protected String abstractFileName;
// protected String paperFileName;
// protected String proposalName;
// protected String keyWords;
// protected String topics;
// protected String listOfAuthors;
// protected List<Integer> reviewers;
// protected List<Integer> refusers;
// protected List<Integer> assignedReviewers;
// protected  List<Review> reviews;
