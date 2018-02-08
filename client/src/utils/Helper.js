import React from 'react';

export function getStars(rating){

  let countFull = Math.floor(rating);

  let result = [];

  for(let i=0; i < countFull; i++){
   result.push(<i key={i} className="fa fa-star"></i>);
  }

  if(rating > countFull){
    result.push(<i key={countFull} className="fa fa-star-half"></i>);
  }

  return result;
}


