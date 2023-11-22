import React, { FC, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useGetRelatedTagsQuery } from '../graphql/index.generated'

export const RelatedTags: FC = () => {
  const [tags, setTags] = useState<string[]>([])
  const [searchParams] = useSearchParams()
  React.useEffect(() => {
    if (searchParams) {
      if (searchParams.has('tags')) {
        setTags(
          searchParams
            .get('tags')
            ?.split(' ')
            ?.map((tag) => decodeURIComponent(tag)) ?? []
        )
      }
    }
  }, [searchParams])
  const { data, loading, error } = useGetRelatedTagsQuery({
    variables: { tags },
  })
  const [showMore, setShowMore] = useState(true)
  useEffect(() => {
    if (data?.queryRelatedTags && data?.queryRelatedTags?.length > 30) {
      setShowMore(false)
    }
  }, [data])

  if (loading || error || tags?.length === 0) return <></>

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
            更多标签（{(data?.queryRelatedTags?.length ?? 0) - 30}个）
          </Button>
        </div>
      )}
    </>
  )
}
