import reducer, { load, loaded, error, cancel } from "../../../store/reducers/userReducer";

test('should return the initial state', () => {
    expect(reducer(undefined, {
        type: undefined
    })).toEqual({ loading: false })
});

test('loading should be true when action is "load"', () => {
    const previousState = { loading: false };
    expect(reducer(previousState, load())).toEqual({ loading: true });
});

test('should return data when action is "loaded"', () => {
    const previousState = { loading: true };
    expect(reducer(previousState, loaded({}))).toEqual({
        loading: false,
        data: {}
    });
});

test('should return error when action is "error"', () => {
    const previousState = { loading: true };
    expect(reducer(previousState, error({}))).toEqual({
        loading: false,
        error: {}
    });
});

test('should return the initial state when action is "cancel"', () => {
    const previousState = { loading: true };
    expect(reducer(previousState, cancel())).toEqual({ loading: false })
});