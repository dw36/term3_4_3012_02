let Database = {
    cindy: {
                    // sprint_1_04_DELETE creation finised; the reminders which created on
                    // the website in virtual Database can be deleted 
                    // while the HARDCODED data below (id1,2,3) can't be deleted
                    //reason : Because it is HARDCODED
        reminders: [{id: 1, title: "abc", description: "abcabc", completed: false},
                     {id: 2, title: "cindy_02_Title", description: "cindy_02_description", completed: true},
                     {id: 3, title: "cindy_03_Title", description: "cindy   03   description", completed: true}
        ]
    },
    alex: {
        //reminders: [{id: 4, title:"alex tile", description: "about Alex!~", completed: false}]
    },
}

module.exports = Database;