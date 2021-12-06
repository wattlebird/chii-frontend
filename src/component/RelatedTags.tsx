import React from 'react';
import styled from 'styled-components';
import { Label, Segment } from '@fluentui/react-northstar';
import { useSearchRelatedTagsQuery } from '../graphql/index.generated';

const TagPanel = styled(Segment)`
  max-width: 30rem;
`;

type RelatedTagsProps = {
  tags: string[],
  // eslint-disable-next-line no-unused-vars
  appendSearchTag: (tag: string) => void
}

function RelatedTags({ tags, appendSearchTag }: RelatedTagsProps) {
  const { loading, data } = useSearchRelatedTagsQuery({
    variables: {
      tags,
    },
  });

  let renderedTags = null;
  if (loading || tags.length === 0) return <TagPanel><div>关联标签</div></TagPanel>;

  if (data?.searchRelatedTags) {
    renderedTags = data.searchRelatedTags
      .filter((itm) => !tags.includes(itm?.tag as string))
      .slice(0, 30)
      .map((itm) => <Label circular key={itm?.tag} content={itm?.tag} styles={{ margin: '0.25rem' }} onClick={() => appendSearchTag(itm?.tag as string)} style={{ cursor: 'pointer' }} />);
  }

  return (
    <TagPanel>
      <div>关联标签</div>
      {renderedTags}
    </TagPanel>
  );
}

export default RelatedTags;
