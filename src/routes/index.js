import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const Foo = {
	template: '<div>foo</div>'
}
const Bar = {
	template: '<div>bar</div>'
}

const routes = [{
		path: '/',
		component: () =>
			import('../containers/demo.vue')
	}, {
		path: '/foo',
		component: Foo
	},
	{
		path: '/bar',
		component: Bar
	}
]

const router = new VueRouter({
	// mode: 'history',
	routes
})

export default router