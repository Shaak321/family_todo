'use strict'
const Database = use('Database')
const Family = use('App/Model/Family')


class FamilyController {
    *get(req,res){
        if(req.currentUser){
        const familyId = req.param('id');
        const familyInfo = yield Database.from('family').select('name').where(function(){
            this.where('id',familyId)
        })
        const familyAdminId =  yield Database.from('family').select('admin_id').where(function(){
            this.where('id',familyId)
        })
        const familyAdmin = yield Database.from('users').select('name,id').where(function(){
            this.where('id',familyAdminId)
        })
        const familyMemberIds = yield Database.from('user_family').select('user_id').where(function(){
            this.where('family_id',familyId)
        })

        let members = []
        for(memberId of familyMemberIds){
            const actualMember = Database.from('users').select('name,id').where(function(){
            this.where('id',memberId)
            members.push(actualMember)
        })
    }

     yield res.sendView('family',{
            familyInfo: familyInfo,
            familyAdminId: familyAdminId,
            familyAdmin: familyAdmin,
            members: members
		})

  }else{
     res.sendView('register') 
  }
}
}

module.exports = FamilyController
