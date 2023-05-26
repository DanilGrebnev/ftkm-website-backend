interface IfilterObject {
    [key: string]: string | undefined
}

export const createSearchQuery = (filterObject: IfilterObject) => {
    let filter: any

    for (let [key, value] of Object.entries(filterObject)) {
        if (value) return

        console.log(value)

        // if (value) {
        //     if (key === 'createdYear') {
        //         filter[key] = { $eq: parseInt(value) }
        //     }

        //     filter[key] = { $regex: new RegExp(value, 'i') }
        // }
    }

    console.log(filter)

    return filter
}
