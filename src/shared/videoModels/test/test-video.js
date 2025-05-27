import { PRICING_TYPES } from '../../PricingScheme.js'

class TestVideo {
  constructor() {
    this.data = {
      id: 'ir/test-video',
      providers: [{
        id: 'test',
        pricing: {
          type: PRICING_TYPES.FIXED,
          value: 0.00,
        },
        applyQuality: this.applyQuality,
        applyImage: this.applyImage,
        applyMask: this.applyMask,
      }],
      arena_score: 0,
      release_date: '2025-05-04',
      examples: [
        {
          video: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4'
        }
      ]
    }
  }

  getData() {
    return this.data
  }

  applyQuality(params) {
    // Change nothing, values are already valited in validateParams.js
    return params
  }

  applyImage(params) {
    // Change nothing, values are already valited in validateParams.js
    return params
  }

  applyMask(params) {
    // Change nothing, values are already valited in validateParams.js
    return params
  }
}

export default TestVideo 