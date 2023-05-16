import React from 'react'
import { TeamType } from 'ReportTypes';

type TobList = {
  id: number;
  name: string;
  comment: string;
  adminComment: string | null;
  reportId: number;
  status: string;
  team: TeamType
  createdAt: string;
}

function ObjectionCards({obList}: {obList: TobList}) {
  console.log(obList)
  return (
    <div>ObjectionCards</div>
  )
}

export default ObjectionCards