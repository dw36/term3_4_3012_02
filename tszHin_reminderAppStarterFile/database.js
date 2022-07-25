let Database = {
    cindy: {
        reminders: [{id: 1, title: "abc", description: "abcabc", completed: false},
                     {id: 2, title: "cindy_02_Title", description: "cindy_02_description", completed: true},
                     {id: 3, title: "cindy_03_Title", description: "cindy   03   description", completed: true}
        ]
    },
    alex: {
        reminders: [{id: 2, title:"alex tile", description: "about Alex!~", completed: false}]
    },
}

module.exports = Database;