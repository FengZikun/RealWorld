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
                <nuxt-link
                  exact
                  class="nav-link"
                  :to="`/?tab=your_feed`"
                  :class="{'active': tab === 'your_feed'}"
                >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  exact
                  class="nav-link"
                  :to="`/?tab=global_feed`"
                  :class="{'active': tab === 'global_feed'}"
                >Global Feed</nuxt-link>
              </li>
              <li v-if="$route.query.tag" class="nav-item">
                <nuxt-link
                  exact
                  class="nav-link"
                  :to="`/?tab=tag_feed&&tag=${tag}`"
                  :class="{'active': tab === 'tag_feed'}"
                >#{{$route.query.tag}}</nuxt-link>
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
                :disabled="article.favoriteDisabled"
                @click="onFavorite(article)"
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
                  tag: $route.query.tag,
                  tab: tab
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
                  tag: item,
                  tab: 'tag_feed'
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
import {
  getList,
  getTag,
  getFeedArticles,
  addFavorite,
  deleteFavorite
} from '@/api/home'
export default {
  name: 'HomeIndex',

  watchQuery: ['page', 'tag', 'tab'],

  async asyncData({ query }) {
    const page = Number.parseInt(query.page) || 1
    const limit = 20
    const [articles, tags] = await Promise.all([
      query.tab === 'your_feed'
        ? getFeedArticles({
            limit,
            offset: (page - 1) * limit
          })
        : getList({
            limit,
            offset: (page - 1) * limit,
            tag: query.tag
          }),
      getTag()
    ])

    articles.data.articles.forEach(item => { item.favoriteDisabled = false})

    return {
      articles: articles.data.articles,
      articlesCount: articles.data.articlesCount,
      limit,
      page,
      tags: tags.data.tags,
      tag: query.tag,
      tab: query.tab || 'global_feed'
    }
  },

  computed: {
    pages() {
      return this.articlesCount / this.limit
    }
  },

  methods: {
    async onFavorite(article) {
      article.favoriteDisabled = true
      if (article.favorited) {
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount -= 1
      } else {
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false

    }
  }
}
</script>

<style>
</style>
