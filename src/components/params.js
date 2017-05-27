var basePath = '';

let params = {
	articleDetail : basePath + '/medicalapi/article/news/detail',  //新闻
    queryListUrl : basePath + '/medicalapi/interaction/comment/queryList', //评论
    collectDelete : basePath + '/medicalapi/interaction/collect/delete', //取消收藏
    collectSave : basePath + '/medicalapi/interaction/collect/save', //收藏
    praiseAdd : basePath + '/medicalapi/interaction/praise/add', //点赞
    querySingle : basePath + '/medicalapi/interaction/comment/querySingle', //新增评论
    praiseQueryList : basePath + '/medicalapi/interaction/pushCommentPraise/queryList', //点赞通知列表
    getDoctorUserDetail : basePath + '/medicalapi/doctorUser/getDoctorUserDetail', //获取医生信息
    questionnaireService : basePath + '/medicalapi/questionnaire/addQuestionnaireService', //帮扶申请表
    studioDetailService : basePath + '/medicalapi/doctorShare/getWorkingGroupDetail',
    workingGroupMembersService : basePath + '/medicalapi/doctorShare/queryWorkingGroupMembers',
    getDoctorHomePageService : basePath + '/medicalapi/doctorShare/getDoctorHomePage',
    getSerceGroupPageService : basePath + '/medicalapi/doctorShare/queryGroup',
}   
export default params;