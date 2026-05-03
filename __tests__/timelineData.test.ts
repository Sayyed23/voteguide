import { stagesData } from '@/data/timelineData'

describe('Timeline Data', () => {
  it('contains exactly 7 stages', () => {
    expect(stagesData).toHaveLength(7)
  })

  it('has sequential IDs from 1 to 7', () => {
    stagesData.forEach((stage, index) => {
      expect(stage.id).toBe(index + 1)
    })
  })

  it('has unique slugs for each stage', () => {
    const slugs = stagesData.map(s => s.slug)
    const uniqueSlugs = new Set(slugs)
    expect(uniqueSlugs.size).toBe(slugs.length)
  })

  it('each stage has required properties', () => {
    stagesData.forEach(stage => {
      expect(stage).toHaveProperty('id')
      expect(stage).toHaveProperty('slug')
      expect(stage).toHaveProperty('label')
      expect(stage).toHaveProperty('icon')
      expect(stage).toHaveProperty('stagePrefix')
      expect(stage).toHaveProperty('title')
      expect(stage).toHaveProperty('description')
      expect(stage).toHaveProperty('steps')
      expect(stage).toHaveProperty('checklist')
      expect(stage).toHaveProperty('faqs')
    })
  })

  it('each stage has exactly 3 steps', () => {
    stagesData.forEach(stage => {
      expect(stage.steps).toHaveLength(3)
    })
  })

  it('each step has num, title, and desc', () => {
    stagesData.forEach(stage => {
      stage.steps.forEach(step => {
        expect(step).toHaveProperty('num')
        expect(step).toHaveProperty('title')
        expect(step).toHaveProperty('desc')
        expect(step.num).toBeTruthy()
        expect(step.title).toBeTruthy()
        expect(step.desc).toBeTruthy()
      })
    })
  })

  it('each stage has at least one checklist item', () => {
    stagesData.forEach(stage => {
      expect(stage.checklist.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('each stage has at least one FAQ', () => {
    stagesData.forEach(stage => {
      expect(stage.faqs.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('checklist items have unique IDs across all stages', () => {
    const allIds = stagesData.flatMap(s => s.checklist.map(c => c.id))
    const uniqueIds = new Set(allIds)
    expect(uniqueIds.size).toBe(allIds.length)
  })

  it('follows correct stage ordering (election lifecycle)', () => {
    const expectedOrder = ['eligibility', 'registration', 'verification', 'voting-methods', 'election-day', 'counting', 'results']
    const actualOrder = stagesData.map(s => s.slug)
    expect(actualOrder).toEqual(expectedOrder)
  })
})
