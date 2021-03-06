import address from '../params.js';
import {post} from '../utils/postUrl.js'


export function getStudioDetail(doctorStudioId,callback){
	let promises = [];
	//Promise异步操作，相当于一任务容器，Resolved(已完成)和Rejected(已失败)
	promises.push(new Promise(function(resolve, reject) {
		post(
			address.studioDetailService,
			{doctorStudioId:doctorStudioId},
			function(data){
				if(data.code == 0){
	            	resolve(data.data);
	            }else{
	            	resolve(data.msg);
	            }
			}
		);
	}));
	promises.push(new Promise(function(resolve, reject) {
		post(
			address.workingGroupMembersService,
			{doctorStudioId:doctorStudioId},
			function(data){
				if(data.code == 0){
	            	resolve(data.data);
	            }else{
	            	resolve(data.msg);
	            }
			}
		);
	}));

	//等待所有任务resolve已完成后
	Promise.all(promises).then(function (result) {
	    callback && callback(result); 
	});
}

export function getDoctorHomePageService(doctorId,callback){
	let promise = new Promise(function(resolve, reject) {
		post(
			address.getDoctorHomePageService,
			{doctorUserId:doctorId},
			function(data){
				if(data.code == 0){
	            	resolve(data.data);
	            }else{
	            	resolve(data.msg);
	            }
			}
		);
	});
	promise.then(function(result){
		callback && callback(result); 
	});
}