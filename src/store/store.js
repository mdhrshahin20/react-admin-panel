import { createReduxStore, register } from '@wordpress/data';

// import * as dashboard from './dashboard';
import * as customer from '../modules/Customer/store';
// import * as course from './course';
// import * as chapter from './chapter';
// import * as lesson from './lesson';
// import * as membership from './membership';
// import * as notification from './notification';
// import * as loader from './loader';
// import * as quiz from './quiz';
// import * as question from './question';
// import * as settings from './settings';
// import * as order from './order';
// import * as  assignment from './assignment';
// import * as emails from './emails';

const combinedReducer = (state = {}, action) => ({
	// dashboard: dashboard.reducer(state.dashboard, action),
	customer: customer.reducer(state.customer, action),
	// course: course.reducer(state.course, action),
	// membership: membership.reducer(state.membership, action),
	// lesson: lesson.reducer(state.lesson, action),
	// chapter: chapter.reducer(state.chapter, action),
	// notification: notification.reducer(state.notification, action),
	// loader: loader.reducer(state.loader, action),
	// quiz: quiz.reducer(state.quiz, action),
	// question: question.reducer(state.question, action),
	// settings: settings.reducer(state.settings, action),
	// order: order.reducer(state.order, action),
	// assignment: assignment.reducer(state.assignment, action),
	// emails: emails.reducer(state.emails, action),
});

const combinedSelectors = {
	// ...dashboard.selectors,
	...customer.selectors,
	// ...course.selectors,
	// ...membership.selectors,
	// ...lesson.selectors,
	// ...chapter.selectors,
	// ...notification.selectors,
	// ...loader.selectors,
	// ...quiz.selectors,
	// ...question.selectors,
	// ...settings.selectors,
	// ...order.selectors,
	// ...assignment.selectors,
	// ...emails.selectors,
};

const combinedActions = {
	// ...dashboard.actions,
	...customer.actions,
	// ...course.actions,
	// ...membership.actions,
	// ...chapter.actions,
	// ...lesson.actions,
	// ...notification.actions,
	// ...loader.actions,
	// ...quiz.actions,
	// ...question.actions,
	// ...settings.actions,
	// ...order.actions,
	// ...assignment.actions,
	// ...emails.actions,
};


const store = createReduxStore( 'radius-booking/store', {
	reducer: combinedReducer,
	actions: combinedActions,
	selectors: combinedSelectors,
} );
register( store );

export default store;
