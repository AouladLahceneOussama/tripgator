import { createSlice } from '@reduxjs/toolkit'

const activities = [
    {
        id: 1,
        categoryId: 2,
        name: 'Quad',
        rate: 5,
        description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.",
        images: [
            require('../../../assets/quad-0.jpg'),
            require('../../../assets/quad-1.jpg'),
            require('../../../assets/quad-2.jpg'),
        ],
        offers: [
            { id: 1, name: 'Package Basic', price: 50, description: 'Standard package' },
            { id: 2, name: 'Package Premium', price: 100, description: 'Contains something extra' },
            { id: 3, name: 'Package Deluxe', price: 150, description: 'Contains more features' },
        ],
        reviews: [
            { id: 1, username: 'Jhon Doe', rating: 4, comment: 'Great activity!', image: 'https://i.pravatar.cc/300?img=1' },
            { id: 2, username: 'Cristian Click', rating: 5, comment: 'Amazing experience!', image: 'https://i.pravatar.cc/300?img=2' },
        ]
    },
    {
        id: 2,
        categoryId: 4,
        name: 'Riding',
        rate: 3,
        description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.",
        images: [
            require('../../../assets/riding-0.jpg'),
            require('../../../assets/riding-1.jpg'),
            require('../../../assets/riding-2.jpg'),
        ],
        offers: [
            { id: 1, name: 'Package Basic', price: 50, description: 'Standard package' },
            { id: 2, name: 'Package Premium', price: 100, description: 'Contains something extra' },
            { id: 3, name: 'Package Deluxe', price: 150, description: 'Contains more features' },
        ],
        reviews: [
            { id: 1, username: 'James Bond', rating: 4, comment: 'Great activity!', image: 'https://i.pravatar.cc/300?img=3' },
            { id: 2, username: 'Mary chick', rating: 5, comment: 'Amazing experience!', image: 'https://i.pravatar.cc/300?img=4' },
        ]
    },
    {
        id: 3,
        categoryId: 6,
        name: 'Karting',
        rate: 1,
        description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.",
        images: [
            require('../../../assets/karting-0.jpg'),
            require('../../../assets/karting-1.jpg'),
            require('../../../assets/karting-2.jpg'),
        ],
        offers: [
            { id: 1, name: 'Package Basic', price: 50, description: 'Standard package' },
            { id: 2, name: 'Package Premium', price: 100, description: 'Contains something extra' },
            { id: 3, name: 'Package Deluxe', price: 150, description: 'Contains more features' },
        ],
        reviews: [
            { id: 1, username: 'Oussama Penguin', rating: 3, comment: 'Great activity!', image: 'https://i.pravatar.cc/300?img=5' },
            { id: 2, username: 'Milody Fun', rating: 5, comment: 'Amazing experience!', image: 'https://i.pravatar.cc/300?img=6' },
        ]
    },
]

const initialState = {
    activities: activities,
    filteredActivities: activities,
    isLoading: false
}

export const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        getActivities: (state, action) => {
            state.activities = initialState.activities
        },
        addActivity: (state, action) => {
            state.activities.push(action.payload)
        },
        updateActivity: (state, action) => {
            const index = state.activities.findIndex(activity => activity.id === action.payload.id)
            state.activities[index] = action.payload
        },
        searchActivities: (state, action) => {
            state.filteredActivities = initialState.activities.filter(activity => activity.name.toLowerCase().includes(action.payload.toLowerCase()))
        },
        filterActivities: (state, action) => {
            if (action.payload == null) {
                state.filteredActivities = initialState.activities
            } else {
                state.filteredActivities = initialState.activities.filter(activity => activity.categoryId === action.payload)
            }
        }
    }
})


export const { getActivities, addActivity, updateActivity, searchActivities, filterActivities } = activitySlice.actions
export default activitySlice.reducer