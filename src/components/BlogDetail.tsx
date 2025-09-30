import React, { useState } from 'react';
import { BlogPost } from '../data/blogPosts';
import { ArrowLeft, Bookmark, BrainCircuit, Clipboard, Heart, MessageSquare, Send, Flag, MoreVertical, CornerDownRight } from 'lucide-react';
import { format } from 'date-fns';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  likes: number;
  replies: Comment[];
}

interface BlogDetailProps {
  post: BlogPost;
  onBack: () => void;
}

const initialComments: Comment[] = [
  {
    id: 1, author: 'Jane Doe', avatar: '/avatars/avatar-1.png', text: 'Great insights, thanks for sharing!', likes: 12, replies: [
      { id: 3, author: 'Alex Johnson', avatar: '/avatars/avatar-3.png', text: 'I agree! Especially the point about state management.', likes: 3, replies: [] },
    ]
  },
  {
    id: 2, author: 'Sam Wilson', avatar: '/avatars/avatar-2.png', text: "I have a different perspective on this, but it's a good read nonetheless.", likes: 5, replies: [] },
];

const ReportModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Report Content</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">Why are you reporting this content?</p>
        <form>
          <div className="space-y-4">
            <div><label><input type="radio" name="reason" value="spam" className="mr-2"/> Spam or Misleading</label></div>
            <div><label><input type="radio" name="reason" value="offensive" className="mr-2"/> Offensive or Hateful</label></div>
            <div><label><input type="radio" name="reason" value="other" className="mr-2"/> Other</label></div>
          </div>
          <textarea className="w-full mt-4 p-2 border rounded dark:bg-gray-700" placeholder="Additional details (optional)"></textarea>
          <div className="mt-6 flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-red-600 text-white">Submit Report</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CommentComponent: React.FC<{ comment: Comment; onReply: (commentId: number, text: string) => void; }> = ({ comment, onReply }) => {
    const [showReplies, setShowReplies] = useState(true);
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState('');

    const handleReplySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (replyText.trim()) {
            onReply(comment.id, replyText);
            setReplyText('');
            setIsReplying(false);
        }
    };

    return (
        <div className="flex items-start space-x-4">
            <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full" />
            <div className="flex-1">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 dark:text-white">{comment.author}</p>
                    <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <button className="hover:text-red-500 dark:hover:text-red-400 flex items-center"><Heart size={14} className="mr-1"/> {comment.likes} Likes</button>
                    <button onClick={() => setIsReplying(!isReplying)} className="hover:text-blue-500 dark:hover:text-blue-400">Reply</button>
                    <button className="hover:text-yellow-500 dark:hover:text-yellow-400"><Flag size={14}/></button>
                </div>

                {isReplying && (
                    <form onSubmit={handleReplySubmit} className="mt-2 flex space-x-2">
                        <input value={replyText} onChange={e => setReplyText(e.target.value)} className="flex-1 p-2 border rounded dark:bg-gray-700" placeholder={`Reply to ${comment.author}...`}/>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
                    </form>
                )}

                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                        <button onClick={() => setShowReplies(!showReplies)} className="text-sm text-blue-500 mb-2">
                            {showReplies ? 'Hide' : 'Show'} {comment.replies.length} replies
                        </button>
                        {showReplies && comment.replies.map(reply => 
                            <div key={reply.id} className="mt-4">
                                <CommentComponent comment={reply} onReply={onReply} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const BlogDetail: React.FC<BlogDetailProps> = ({ post, onBack }) => {
    const [isReportModalOpen, setReportModalOpen] = useState(false);
    const [comments, setComments] = useState(initialComments);
    const [isSummarized, setIsSummarized] = useState(false);
    const [summaryText, setSummaryText] = useState('');

    const addComment = (text: string) => {
        const newComment: Comment = { id: Date.now(), author: 'Current User', avatar: '/avatars/avatar-current.png', text, likes: 0, replies: [] };
        setComments([newComment, ...comments]);
    };
    
    const addReply = (commentId: number, text: string) => {
        const newReply: Comment = { id: Date.now(), author: 'Current User', avatar: '/avatars/avatar-current.png', text, likes: 0, replies: [] };
        const updatedComments = comments.map(c => {
            if (c.id === commentId) {
                return { ...c, replies: [newReply, ...c.replies] };
            }
            return c;
        });
        setComments(updatedComments);
    };

    const handleSummarize = () => {
        const summary = post.content.split('. ').slice(0, 3).join('. ') + '...';
        setSummaryText(summary);
        setIsSummarized(true);
    };

    const handleCopySummary = () => {
        navigator.clipboard.writeText(summaryText);
    };

    return (
        <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <ReportModal isOpen={isReportModalOpen} onClose={() => setReportModalOpen(false)} />
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <button onClick={onBack} className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline mb-6">
                    <ArrowLeft size={20} />
                    <span>Back to Home</span>
                </button>
                <article>
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">{post.title}</h1>
                    <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                        <span>By {post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readingTime} min read</span>
                    </div>
                    <img src={post.imageUrl} alt={post.title} className="w-full h-auto rounded-lg shadow-lg mb-8" />
                    
                    {isSummarized ? (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                            <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-900 dark:text-white"><BrainCircuit size={24} className="mr-2"/> AI Summary</h2>
                            <p className="text-lg mb-6">{summaryText}</p>
                            <div className="flex space-x-4">
                                <button onClick={handleCopySummary} className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"><Clipboard size={16}/><span>Copy</span></button>
                                <button onClick={() => setIsSummarized(false)} className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"><span>Back to Full Blog</span></button>
                            </div>
                        </div>
                    ) : (
                        <div className="prose dark:prose-invert max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
                    )}
                    
                    <div className="flex items-center justify-between border-t border-b border-gray-200 dark:border-gray-700 py-4">
                        <div className="flex items-center space-x-6">
                            <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"><Heart size={20} /><span>Like</span></button>
                            <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"><Bookmark size={20} /><span>Bookmark</span></button>
                            <button onClick={() => setReportModalOpen(true)} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400"><Flag size={20} /><span>Report</span></button>
                            <button onClick={handleSummarize} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400"><BrainCircuit size={20} /><span>AI Summarizer</span></button>
                        </div>
                    </div>
                </article>

                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comments ({comments.length})</h2>
                    <div className="space-y-8">
                        {comments.map(comment => <CommentComponent key={comment.id} comment={comment} onReply={addReply} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogDetail;
