import { createConstants } from 'redux-action-helper';

const actions = createConstants(
    'SHOW_ACTION'
);

const showAction = value => ({
    type: actions.SHOW_ACTION,
    value
});

export {
    showAction,
    actions
};
