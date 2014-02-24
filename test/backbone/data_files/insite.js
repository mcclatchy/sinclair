//SHOW HIDE CSS

//if (typeof account_user_name != 'undefined' && typeof insitecookie != 'undefined') {
	var account_user_name = getInsiteUserName( insitecookie );
	if ( -1  == account_user_name) {
		document.write("<style>#member{display:none;}</style>");
		account_user_name = 'Guest';
	} else {
		document.write("<style>#nonmember{display:none;}</style>");
	}
//}

var rurl_qs = '';
var loc = ''+document.location;
if (loc.match('/reg-bin/') )
{
    rurl_qs = ";goto=/";
}
else
{
    rurl_qs = ";goto="+loc
}



// temporary switch stand in for Pluck
var siteLife_master_switch_on = true;
var sitelife_is_on = true;

if (!siteLife_master_switch_on || !sitelife_is_on) {
	var gSiteLife = {
		AddEventHandler: function () {},
		FireEvent: function () {},
		ScriptId: function() {},
		OnError: function() {},
		OnDebug: function() {},
		GetParameter: function() {},
		GetElement: function() {},
		GetTags: function() {},
		EscapeValue: function() {},
		__ArrayValidation: function() {},
		__CheckErrorHandler: function() {},
		SetCookie: function SetCookie() {},
		__GetArgument: function() {},
		__StripAnchorFromUrl: function() {},
		__SafeAppendUrlValue: function() {},
		__AppendUrlValues: function () {},
		ReloadPage: function() {},
		__Send: function() {},
		Logout: function() {},
		AddLoadEvent: function() {},
		AdInsertHelper: function() {},
		InsertAds: function() {},
		TitleTag: function() {},
		WriteDiv: function() {},
		InnerHtmlWrite: function() {},
		SortTimeStampDescending: "TimeStampDescending",
		SortTimeStampAscending: "TimeStampAscending",
		SortRecommendationsDescending: "RecommendationsDescending",
		SortRecommendationsAscending: "RecommendationsAscending",
		SortRatingDescending: "RatingDescending",
		SortRatingAscending: "RatingAscending",
		SortAlphabeticalAscending: "AlphabeticalAscending",
		SortAlphabeticalDescending: "AlphabeticalDescending",
		KeyTypeExternalResource: "ExternalResource",
		PersonaHeaderRequest: function() {},
		PersonaHeader: function() {},
		Persona: function() {},
		LoadPersonaPage: function() {},
		PersonaHome: function() {},
		PopulateGroupsDiv: function() {},
		WatchItem: function() {},
		PersonaRemoveWatchItem: function() {},
		PersonaAddFriend: function() {},
		PersonaRemoveFriend: function() {},
		PersonaRemovePendingFriend: function() {},
		PersonaAddPendingFriend: function() {},
		PersonaMessages: function() {},
		PersonaComments: function() {},
		PersonaBlog: function() {},
		PersonaProfile: function() {},
		PersonaWatchListPaginate: function() {},
		PersonaFriendsPaginate: function() {},
		PersonaFriendsExpand: function() {},
		PersonaFriendsCollapse: function() {},
		PersonaPendingFriendsPaginate: function() {},
		PersonaMessagesPreviewPaginate: function() {},
		PersonaMessageRemove: function() {},
		PersonaSend: function() {},
		PersonaPaginate: function() {},
		PersonaPhotoSend: function() {},
		PersonaMostRecent: function() {},
		PersonaCommunityGroupsPaginate: function() {},
		PersonaCreateGallery: function() {},
		PersonaEditGallery: function() {},
		PersonaUploadToUserGallery: function() {},
		PersonaPhotos: function() {},
		PersonaAllPhotos: function() {},
		PersonaGalleryPhoto: function() {},
		PersonaMyRecentPhotos: function() {},
		PersonaGallery: function() {},
		UserGalleryList: function() {},
		PersonaGallerySubmissions: function() {},
		PersonaGalleryPhoto: function() {},
		PersonaRecentGalleryPhoto: function() {},
		LoadPersonaGalleryPage: function() {},
		LoadPersonaPhotoPage: function() {},
		LoadPersonaRecentPhotoPage: function() {},
		ShowFacebookHelpDialog: function() {},
		CopyRssUrlToClipboard: function() {},
		SolicitPhoto: function() {},
		PhotoUpload: function() {},
		PublicGallery: function() {},
		GalleryPhoto: function() {},
		PublicGalleries: function() {},
		PhotoRecommend: function() {},
		Comments: function() {},
		CommentsInput: function() {},
		CommentsOutput: function() {},
		CommentsRefresh: function() {},
		CommentsInternal: function() {},
		GetComments: function() {},
		Blog: function() {},
		LoadBlogPage: function() {},
		BlogViewEdit: function() {},
		BlogPostCreate: function() {},
		BlogPendingComments: function() {},
		BlogSettings: function() {},
		BlogEditPost: function() {},
		BlogRemovePost: function() {},
		BlogViewPost: function() {},
		BlogViewMonth: function() {},
		AddBlogWatchItem: function() {},
		RemoveBlogWatchItem: function() {},
		BlogViewTag: function() {},
		BlogRefreshViewEditList: function() {},
		BlogSend: function() {},
		Recommend: function() {},
		BlogSelectPendingComments: function() {},
		Forums: function() {},
		ForumCategories: function() {},
		Forum: function() {},
		ForumDiscussion: function() {},
		ForumCreateDiscussion: function() {},
		ForumMain: function() {},
		ForumCreatePost: function() {},
		ForumEditPost: function() {},
		ForumEditProfile: function() {},
		ToggleExpand: function() {},
		ForumSearch: function() {},
		ForumSearchKeyPress: function() {},
		ForumSearchPaginate: function() {},
		ForumSpecificForumSearchKeyPress: function() {},
		ForumSpecificForumSearch: function() {},
		ForumSearchSpecificForumPaginate: function() {},
		LoadForumPage: function() {},
		ForumSend: function() {},
		ForumDiscussionEdit: function() {},
		ForumDiscussionToggleIsSticky: function() {},
		ForumDiscussionToggleIsClosed: function() {},
		ForumDiscussionDelete: function() {},
		MoveDiscussion: function() {},
		ForumEdit: function() {},
		ForumToggleIsClosed: function() {},
		ForumDelete: function() {},
		ForumPostDelete: function() {},
		ForumBlockUser: function() {},
		ForumMyDiscussionsPaginate: function() {},
		ForumImage: function() {},
		BaseAdParam: function () {},
		ForumJoinGroup: function() {},
		ForumLeaveGroup: function() {},
		ForumGroupMemberList: function() {},
		ForumInviteUser: function() {},
		ForumGroupConfirm: function() {},
		ForumSendInviteToUser: function() {},
		ForumAddEnemy: function() {},
		ForumRemoveEnemy: function() {},
		ForumChangeSort: function() {},
		Recommend: function() {},
		PostRecommendation: function() {},
		RateItem: function () {},
		Rating: function() {},
		RatingClickStar: function () {},
		RatingFillStar: function() {},
		Review: function() {},
		ReviewClickStar: function () {},
		GetReviews: function() {},
		SummaryArticlesMostCommented: function() {},
		SummaryArticlesMostRecommended: function() {},
		SummaryPhotosRecentPhotosByTag: function() {},
		SummaryPhotosRecentUserPhotos: function() {},
		SummaryPhotosRecentPhotos: function() {},
		SummaryPhotosMostRecommendedPhotos: function() {},
		SummaryPhotosMostRecommendedUserPhotos: function() {},
		SummaryPhotosMostRecommendedGalleries: function() {},
		SummaryForumsRecentDiscussions: function() {},
		SummaryBlogsRecent: function() {},
		SummaryBlogsRecentPostsByTag: function() {},
		SummaryBlogsRecentPosts: function() {},
		SummaryBlogsMostRecommendedPosts: function() {},
		SummaryPersonaProfileRecent: function() {},
		SummaryPanel: function() {},
		SummarySend: function() {}
	}
	var RequestBatch = function() {};
	RequestBatch.prototype = {
		initialize: function() {},
		AddToRequest: function(requestThis) { },
		BeginRequest: function(serverUrl, callback) {}
	};
	function Section () {}
	function Category () {}
	function Activity () {}
	function ContentType () {}
	function UserTier () {}
	function DiscoverContentAction () {}
	function UserKey () {}
	function ArticleKey () {}
	function UpdateArticleAction () {}
	function CommentPage () {}
}
