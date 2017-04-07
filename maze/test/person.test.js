import Person from '../src/js/person.js'
import { expect } from 'chai'

describe('Person findRoute方法测试：（将传入的无序路径进行排列）', function () {
  it('[[1, 2], [0, 0], [1, 1], [1, 0]]应该被正确排序', function () {
    expect(Person.findRoute([[1, 2], [0, 0], [1, 1], [1, 0]])).to.deep.equal([[0, 0], [1, 0], [1, 1], [1, 2]])
  })
})
