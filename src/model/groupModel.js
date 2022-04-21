const { dbcon } = require("../database/connection");
class GroupModel {
    constructor(id,name,adminid,img) {
        this.id = id;
        this.name = `"${name}"`;
        this.adminid = adminid;
        this.img = img;
        this.created_at = new Date().toISOString();
        this.updated_at = new Date().toISOString();
        this.activate = 'true';
    }
}

// DAO = DATA ACCESS OBJECT
class GroupDAO {

    
    static async createGroup(group) {
          
        const sql = 'INSERT INTO public.groups (name,adminid,img) VALUES ($1,$2,$3) RETURNING id;';
        const values = [group.name, group.adminid,group.img];
        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('Error groupDAO.createGroup',{ error });
        }
    }
    static async getAllGroups(offset=0,limit=5) {
        const sql = `
            select 
                g.id,
                g.img,
                g.name,
                g.adminid,
                g.created_at,
                g.updated_at,
                g.activate,
                (select count(*) from group_members gm where gm.groupid=g.id) as memberqt,
                array_agg(gm2.userid) as users
            from "groups" g
            left join group_members gm2 on gm2.groupid=g.id 
            group by g.id
            limit ${limit}
            offset ${offset};
        `;
        const result = await dbcon.query(sql);
        return result.rows;
    }
    static async countTotalGroups(){
        const sql = `select count(*) as qt from "groups" g;`;
        const result = await dbcon.query(sql);
        return result.rows[0].qt;
    }
}

module.exports = {
    GroupModel,
    GroupDAO
};