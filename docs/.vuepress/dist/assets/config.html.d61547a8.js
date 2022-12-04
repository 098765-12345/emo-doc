import{_ as n,o as s,c as a,a as e}from"./app.977744f4.js";const t="/images/config-panel.jpg",o={},p=e(`<h1 id="配置读取与存储" tabindex="-1"><a class="header-anchor" href="#配置读取与存储" aria-hidden="true">#</a> 配置读取与存储</h1><p>每一个 app 的运行，都离不开各种各样的配置，有的配置通过后台下发，有的配置则是开发者的彩蛋，那么如何存储这些配置？如何减少因为配置而需要写的各种模板代码？<code>emo</code> 通过注解配合 <code>ksp</code> 的代码生成，为开发者提供了一套便利的方式。</p><h2 id="依赖引入" tabindex="-1"><a class="header-anchor" href="#依赖引入" aria-hidden="true">#</a> 依赖引入</h2><div class="language-kts line-numbers-mode" data-ext="kts"><pre class="language-kts"><code><span class="token keyword">val</span> version <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;0.3.0&quot;</span></span>
<span class="token comment">// 默认提供了 mmkv 的存储实现</span>
<span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;cn.qhplus.emo:config-mmkv:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">version</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
<span class="token comment">// 可选：如果想自定义存储实现，则需引入 config-runtime 库</span>
<span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;cn.qhplus.emo:config-runtime:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">version</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
<span class="token comment">// 可选：可是化的配置面板，可以引入和作为彩蛋供开发、产品、测试使用</span>
<span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;cn.qhplus.emo:config-panel:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">version</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
<span class="token comment">// 需要引入 ksp plugin.</span>
<span class="token function">ksp</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;cn.qhplus.emo:config-ksp:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">version</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2><h3 id="定义配置" tabindex="-1"><a class="header-anchor" href="#定义配置" aria-hidden="true">#</a> 定义配置</h3><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code>
<span class="token annotation builtin">@ConfigBasic</span><span class="token punctuation">(</span>
    category <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;分类&quot;</span></span><span class="token punctuation">,</span>
    name <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;config_test&quot;</span></span><span class="token punctuation">,</span>
    humanName <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;测试配置&quot;</span></span><span class="token punctuation">,</span> <span class="token comment">// 这个会被配置面板所使用</span>
    versionRelated <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 是否是版本相关</span>
    tags <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string-literal singleline"><span class="token string">&quot;test&quot;</span></span><span class="token punctuation">]</span> <span class="token comment">// 可以打标签</span>
<span class="token punctuation">)</span>
<span class="token annotation builtin">@ConfigWithIntValue</span><span class="token punctuation">(</span>default <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// 默认值</span>
<span class="token keyword">sealed</span> <span class="token keyword">interface</span> ConfigTest

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开发者通过注解，可以配置很多元信息，包裹：</p><ol><li>分类，可用于配置面板，以及更多自定义场景</li><li>是否版本相关，这个用途主要是 app 升级版本后，配置项要不要恢复成默认值？</li><li>标签，各种自定义化场景，例如可以服务端下发指令，还原某个标签的全部配置为默认值。</li><li>配置的数据类型，目前有 <code>@ConfigWithIntValue</code>、<code>@ConfigWithBoolValue</code>、<code>@ConfigWithLongValue</code>、<code>@ConfigWithFloatValue</code>、<code>@ConfigWithDoubleValue</code>、<code>@ConfigWithStringValue</code> 六种类型</li><li>注解是添加在一个 <code>sealed</code> 类型的接口上，接口是可以添加方法，然后添加实现类的，具体可查看<a href="#%E6%8E%A5%E5%8F%A3%E5%A2%9E%E6%B7%BB%E5%AE%9E%E7%8E%B0%E7%B1%BB">接口增添实现类</a>。</li></ol><blockquote><p>注： 接口都必须使用 sealed，所以只能用于主工程，不支持多模块。</p></blockquote><h3 id="实例化-configcenter" tabindex="-1"><a class="header-anchor" href="#实例化-configcenter" aria-hidden="true">#</a> 实例化 <code>ConfigCenter</code></h3><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> configCenter <span class="token keyword">by</span> lazy <span class="token punctuation">{</span>
   <span class="token function">configCenterWithMMKV</span><span class="token punctuation">(</span>BuildConfig<span class="token punctuation">.</span>VERSION_CODE<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>configCenterWithMMKV</code> 的完整定义为：</p><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token function">configCenterWithMMKV</span><span class="token punctuation">(</span>
   version<span class="token operator">:</span> Int<span class="token punctuation">,</span> <span class="token comment">// 版本</span>
   name<span class="token operator">:</span> String <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;emo-cfg-mmkv&quot;</span></span><span class="token punctuation">,</span> <span class="token comment">// mmkv id</span>
   prodMode<span class="token operator">:</span> Boolean <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 是否是非 debug 模式</span>
   multiProcess<span class="token operator">:</span> Boolean <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// mmkv 多进程安全</span>
   autoClearUp<span class="token operator">:</span> Boolean <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token comment">// 自动清理不被注解控制且非当前版本的配置项</span>
<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置的读写" tabindex="-1"><a class="header-anchor" href="#配置的读写" aria-hidden="true">#</a> 配置的读写</h3><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token comment">// 通过 concreteInt 具体化到 int 类型</span>
<span class="token keyword">val</span> action <span class="token operator">=</span> configCenter<span class="token punctuation">.</span>actionOf<span class="token operator">&lt;</span>ConfigTest<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">concreteInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 编译期间也会生成 actionOfConfigTest 方法，可以帮你做好这个类型的具体化</span>
<span class="token keyword">val</span> action <span class="token operator">=</span> configCenter<span class="token punctuation">.</span><span class="token function">actionOfConfigTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 读取</span>
<span class="token keyword">val</span> value <span class="token operator">=</span> action<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 写入</span>
action<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>xx<span class="token punctuation">)</span>
<span class="token comment">// 以 stateFlow 的形式监听配置的更改</span>
action<span class="token punctuation">.</span><span class="token function">stateFlowOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="接口增添实现类" tabindex="-1"><a class="header-anchor" href="#接口增添实现类" aria-hidden="true">#</a> 接口增添实现类</h3><p>我们定义配置项，有时候我们是需要获取配置项的值，但更多场景是我们需要根据不同的配置做不同的事。</p><p>如果我们不做任何包装，那我们就是读取配置后，根据配置的值写一堆的 if else。</p><p>使用 <code>emo</code> 的本组件就不再有这个烦恼了，以获取请求域名为例：</p><ol><li>和之前一样，定义接口：</li></ol><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@ConfigBasic</span><span class="token punctuation">(</span>
   category <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;implementation&quot;</span></span><span class="token punctuation">,</span>
   name <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;test_domain&quot;</span></span><span class="token punctuation">,</span>
   humanName <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;请求环境&quot;</span></span><span class="token punctuation">,</span>
   versionRelated <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token punctuation">)</span>
<span class="token annotation builtin">@ConfigWithIntValue</span><span class="token punctuation">(</span>default <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">sealed</span> <span class="token keyword">interface</span> ConfigHost <span class="token operator">:</span> ConfigImplDisplayable <span class="token punctuation">{</span>
   <span class="token keyword">fun</span> <span class="token function">getHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不同的是这里添加了 <code>getHost</code> 方法， <code>ConfigImplDisplayable</code> 主要用于配置面板的可视化，这里可以先不关注。</p><ol start="2"><li>增添各个子类</li></ol><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code>
<span class="token annotation builtin">@ConfigWithIntValue</span><span class="token punctuation">(</span>default <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">object</span> ConfigTestImplDisplayA <span class="token operator">:</span> ConfigHost <span class="token punctuation">{</span>

   <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">displayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token string-literal singleline"><span class="token string">&quot;现网环境&quot;</span></span>
   <span class="token punctuation">}</span>

   <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">getHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token string-literal singleline"><span class="token string">&quot;prod.qhplus.cn&quot;</span></span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token annotation builtin">@ConfigWithIntValue</span><span class="token punctuation">(</span>default <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token keyword">object</span> ConfigTestImplDisplayB <span class="token operator">:</span> ConfigHost <span class="token punctuation">{</span>

   <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">displayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token string-literal singleline"><span class="token string">&quot;开发环境&quot;</span></span>
   <span class="token punctuation">}</span>

   <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">getHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token string-literal singleline"><span class="token string">&quot;dev.qhplus.cn&quot;</span></span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token annotation builtin">@ConfigWithIntValue</span><span class="token punctuation">(</span>default <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token keyword">object</span> ConfigTestImplDisplayC <span class="token operator">:</span> ConfigHost <span class="token punctuation">{</span>

   <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">displayName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token string-literal singleline"><span class="token string">&quot;测试环境&quot;</span></span>
   <span class="token punctuation">}</span>

   <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">getHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token string-literal singleline"><span class="token string">&quot;test.qhplus.cn&quot;</span></span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我给出了三个实现，分配通过 <code>ConfigWithIntValue</code> 配置了不同的值。</p><ol start="3"><li>通过 <code>ConfigCenter</code> 获取当前配置下的实现类</li></ol><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token comment">// 通过当前配置值获取实现类</span>
<span class="token keyword">val</span> configHost <span class="token operator">=</span> configCenter<span class="token punctuation">.</span>implOf<span class="token operator">&lt;</span>ConfigHost<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?:</span> <span class="token keyword">throw</span> <span class="token function">RuntimeException</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;配置值没有实现类&quot;</span></span><span class="token punctuation">)</span>
<span class="token comment">// 调用接口方法</span>
<span class="token keyword">val</span> host <span class="token operator">=</span> configHost<span class="token punctuation">.</span><span class="token function">getHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如此以来，就通过接口规避了各种各样的 if else.</p><h3 id="使用-configpanel-可视化配置项" tabindex="-1"><a class="header-anchor" href="#使用-configpanel-可视化配置项" aria-hidden="true">#</a> 使用 <code>ConfigPanel</code> 可视化配置项</h3><p><code>ConfigPanel</code> 是一个 <code>Composable</code> 函数，你可按需引入，例如以 <code>BottomSheet</code> 的形式引入：</p><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code>view<span class="token punctuation">.</span><span class="token function">emoBottomSheet</span> <span class="token punctuation">{</span>
    <span class="token function">ConfigPanel</span><span class="token punctuation">(</span>configCenter<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>emo</code> 的 <code>Demo</code> 程序的显示结果为：</p><img width="280" alt="配置面板" src="`+t+'"><p>并且使用者可以根据名称搜索配置，然后修改。</p><p>特别留意请求环境一栏，因为配置接口继承了 <code>ConfigImplDisplayable</code>, 所以可以把配置项显示成实现类的设置，如果点击，直接切换到下一个实现类的配置，这样子也就能组织使用者输入配置支持外的值。</p>',36),i=[p];function l(c,u){return s(),a("div",null,i)}const d=n(o,[["render",l],["__file","config.html.vue"]]);export{d as default};
