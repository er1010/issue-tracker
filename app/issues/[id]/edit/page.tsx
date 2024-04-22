
import React from 'react'
import IssueForm from '../../_component/IssueForm'
import prisma from '@/prisma/client'

const IssueEditPage = async ({params}:{params:{id:string}}) => {
  const issue = await prisma.issue.findUnique({
    where:{id: parseInt(params.id)}
  })

  return (
   <IssueForm issue={issue}/>
  )
}

export default IssueEditPage