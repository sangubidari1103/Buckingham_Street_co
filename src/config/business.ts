export const businessConfig = {
  brand: {
    parent: 'Buckingham Street Co.',
    retail: 'Suit Galleria',
    tagline: 'British Heritage · Italian Luxury · Contemporary Atelier',
  },
  contact: {
    phone: '080-41223066',
    whatsapp: '918041223066',
    email: 'galleriasuit@yahoo.com',
    address: {
      line1: '#19, Kempegowda Road',
      line2: '',
      city: 'Bengaluru',
      postcode: '560 009',
      country: 'India',
    },
    mapsUrl: 'https://maps.app.goo.gl/VoX1QgQeVGWkqzeD7',
    mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6538.729145458714!2d77.57630848639832!3d12.974946789323278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae160eecd714c1%3A0x3b3dffd95152bbc6!2sSuit%20Galleria!5e0!3m2!1sen!2sin!4v1791673551824!5m2!1sen!2sin',
    reviewsUrl: 'https://www.google.com/maps/place/Suit+Galleria/@12.974946789323278,77.57630848639832,17z/data=!4m8!3m7!1s0x3bae160eecd714c1:0x3b3dffd95152bbc6!8m2!3d12.974946789323278!4d77.57630848639832!9m1!1b1!16s%2Fg%2F11c1w9q9x9?hl=en&entry=ttu',
  },
  hours: {
    monday: '10:00 - 20:00',
    tuesday: '10:00 - 20:00',
    wednesday: '10:00 - 20:00',
    thursday: '10:00 - 20:00',
    friday: '10:00 - 20:00',
    saturday: '10:00 - 20:00',
    sunday: 'Closed',
  },
  social: {
    instagram: '',
    facebook: '',
  },
}

export type BusinessConfig = typeof businessConfig