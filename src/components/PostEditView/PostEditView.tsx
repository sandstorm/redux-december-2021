import { connect, ConnectedProps } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { Post } from '../../model/Post'
import { RootState } from '../../store/configureStore'
import { selectors, updatePost } from '../../store/posts/posts'
import PostEditor from '../PostEditor/PostEditor'
import './PostEditView.scss'

type RouteProps = {
  id: string
}

type OwnProps = {
  postId: Post['id']
} & RouteComponentProps<RouteProps>

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const postId = ownProps.match.params.id

  return {
    post: selectors.getPostById(state, { postId }),
  }
}

const mapDispatchToProps = {
  updatePost,
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & OwnProps

const PostEditorView = (props: Props) => {
  return (
    <div className="post-editor-view">
      <header>
        <h1>Edit Post</h1>
      </header>
      <main>
        <PostEditor post={props.post} onSave={props.updatePost} />
      </main>
    </div>
  )
}

export default connector(PostEditorView)
