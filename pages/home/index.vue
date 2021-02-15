<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href>Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href>Global Feed</a>
              </li>
              <li v-if="$route.query.tag" class="nav-item">
                <a class="nav-link active" href>#{{$route.query.tag}}</a>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <nuxt-link
                :to="{
              name: 'profile',
              params: {
                username: article.author.username
              }
            }"
              >
                <img :src="article.author.image">
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username
                    }
            }"
                >{{article.author.username}}</nuxt-link>
                <span class="date">January 20th</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{'active': article.favorited}"
              >
                <i class="ion-heart"></i>
                {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="`/article/${article.slug}`" href class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{article.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>

        <nav>
          <ul class="pagination">
            <li
              class="page-item ng-scope"
              :class="{'active': item === page}"
              v-for="item in pages"
              :key="item"
            >
              <nuxt-link
                class="page-link ng-binding"
                :to="{
                name: 'home',
                query: {
                  page: item,
                  tag: $route.query.tag
                }
              }"
              >{{item}}</nuxt-link>
            </li>
          </ul>
        </nav>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{
                name: 'home',
                query: {
                  tag: item
                }
              }"
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
              >{{item}}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getList, getTag } from '@/api/home'
export default {
  name: 'HomeIndex',

  watchQuery: ['page', 'tag'],

  async asyncData({ query }) {
    const page = Number.parseInt(query.page) || 1
    const limit = 20
    const [articles, tags] = await Promise.all([
      getList({
        limit,
        offset: (page - 1) * limit,
        tag: query.tag
      }),
      getTag()
    ])

    return {
      articles: articles.data.articles,
      articlesCount: articles.data.articlesCount,
      limit,
      page,
      tags: tags.data.tags
    }
  },

  computed: {
    pages() {
      return this.articlesCount / this.limit
    }
  }
}
</script>

<style>
</style>
