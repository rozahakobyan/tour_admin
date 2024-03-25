export const addDestinationRegex = /[a-z-A-Z0-9],{0,120}/

export const validateAddTour = (tour) => {
    const {
        schedule,
        gallery,
        featuredImage
    } = tour
    const errors = {}

    if (schedule.length === 0) {
        errors.schedule = 'schedule date is not allowed to be empty'
    }
    if (gallery.length === 0) {
        errors.gallery = 'gallery list is not allowed to be empty'
    }
    if (featuredImage === null) {
        errors.featuredImage = 'featured image is not allowed to be empty'
    }
    return errors
}
