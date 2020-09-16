/*jshint esversion: 6 */

module.exports={
    url:'/vue-element-admin/table',
    type:'get',
    response: _ => {
            return {
            code: 20000,
            data:{
                'status|1': ['success', 'js']
            }
            };
    }
};
