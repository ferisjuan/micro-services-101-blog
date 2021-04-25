export default ({ comments }) => {
	const renderedComments = comments.map(comment => {
		const content = (() => {
			if (comment.status === 'approved') return comment.content
			if (comment.status === 'pending')
				return 'This comment is awaiting moderation'
			return 'this comment has been rejected'
		})()

		return <li key={comment.id}>{content}</li>
	})

	return <ul>{renderedComments}</ul>
}
