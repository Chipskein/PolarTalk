# DSII2-trab

//VISUALIZAR E INCLUIR C R D

//soft de
users{
    id
    img
    name
    email
    password
    created_at
    updated_at
    activate
}
//soft de
group{
    id
    img
    name
    adminid
    email
    password
    birthdate
    created_atC
    updated_at
    activate
}
//delete
group_members{
    userdi
    groupid
    participated_at
    permissions
}
//delete
group_permission{
    id
    name
    description
}
//soft del
msgs{
    txt
    userid
    groupid
    created_at
    updated_at
    activate
}