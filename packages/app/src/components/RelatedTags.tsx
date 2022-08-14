import React, { FC, useState, useEffect } from 'react'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useGetRelatedTagsQuery } from '../graphql/index.generated'

interface RelatedTagsProps {
  tags: string[]
}

export const RelatedTags: FC<RelatedTagsProps> = ({ tags }) => {
  const { data, loading, error } = useGetRelatedTagsQuery({
    variables: { q: tags.join('+') },
  })
  const [showMore, setShowMore] = useState(false)
  useEffect(() => {
    if (data?.queryRelatedTags && data?.queryRelatedTags?.length > 30) {
      setShowMore(false)
    }
  }, [data])

  if (loading || error) return <></>

  return (
    <>
      <Typography variant='h6' gutterBottom sx={{ fontWeight: 'bold' }}>
        相似标签
      </Typography>
      {data?.queryRelatedTags?.slice(0, showMore ? undefined : 30).map((tag) => (
        <Chip
          key={tag.content}
          label={
            <span>
              {tag.content} <small>{tag.userCount}</small>
            </span>
          }
          size='small'
        />
      ))}
      {!showMore && (
        <div>
          <Button variant='text' onClick={() => setShowMore(true)}>
            更多标签（{data?.queryRelatedTags?.length ?? 0 - 30}个）
          </Button>
        </div>
      )}
    </>
  )
}
