import { PRICING_TYPES } from '../../PricingScheme.js'

class Imagen4Fast0606 {
  constructor() {
    this.data = {
      id: 'google/imagen-4-fast-06-06',
      providers: [{
        id: 'vertex',
        model_name: 'imagen-4.0-fast-generate-preview-06-06',
        pricing: {
          type: PRICING_TYPES.FIXED,
          value: 0.02,
        }
      }],
      release_date: '2025-06-06',
      examples: [{
        image: '/model-examples/imagen-4-fast-06-06-2025-06-14T20-58-35-827Z.webp',
      }]
    }
  }

  getData() {
    return this.data
  }
}

export default Imagen4Fast0606