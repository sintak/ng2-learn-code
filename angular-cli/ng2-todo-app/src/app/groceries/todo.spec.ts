import { Todo } from './todo';

describe('Todo', () => {

    it('should create an instance', () => {
        expect(new Todo()).toBeTruthy();
    });

    it('should accept values in the constructor2', () => {
        let todo = new Todo({
            title: 'hello',
            complete: true
        });

        expect(todo.title).toEqual('hello');

        expect(todo.complete).toEqual(false);  // 故意写false让测试结果为FAILED
    });
});
