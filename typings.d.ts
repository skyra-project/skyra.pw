import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
	  invite?: string;
	  dashboard?: boolean;
  }
 }
