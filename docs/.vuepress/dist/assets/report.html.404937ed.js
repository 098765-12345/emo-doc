import{_ as n,o as s,c as a,a as t}from"./app.977744f4.js";const e={},p=t(`<h1 id="上报" tabindex="-1"><a class="header-anchor" href="#上报" aria-hidden="true">#</a> 上报</h1><p>在推荐系统盛行的今天，一个稳定的上报组件就格外重要了，如果上报的数据出现丢失、不及时等，那整个推荐系统的结果都是不可信任的了。所以 <code>emo</code> 就提供了一套封装，方便开发者把精力集中在自己的业务上。</p><p>一般而言，上报分为三种类型：</p><ol><li>立即上报：像 App 唤醒之类，因为涉及到了日活数据，肯定要非常及时才行。</li><li>内存 Batch 上报：如果没一个上报都立即执行，那服务端压力就比较大，所以是 batch 上报是很有必要存在的。但数据只存于内存，会存在丢数据的情况，所以只适应于丢数据也影响不大的场景。</li><li>文件 Batch 上报：上报先通过 mmap 写入文件，然后再把整个文件的数据发送给后端，这个还可以应用于无网络、网络失败等场景，保证不会丢数据。</li></ol><p><code>emo</code> 主要就是封装好了这几种场景，至于具体的数据上报格式，则需要开发者定义好，然后告知 <code>emo</code>。</p><h2 id="依赖引入" tabindex="-1"><a class="header-anchor" href="#依赖引入" aria-hidden="true">#</a> 依赖引入</h2><div class="language-kts line-numbers-mode" data-ext="kts"><pre class="language-kts"><code><span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;cn.qhplus.emo:config-report:0.3.0&quot;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2><p>这里假设以 <code>kotlinx.serialization.protobuf</code> 的数据格式来使用本组件</p><ol><li>定义消息类型</li></ol><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token comment">// 定义总的消息类型，然后可以根据 name 解析出不通过的 content 类型</span>
<span class="token annotation builtin">@Serializable</span>
<span class="token keyword">class</span> <span class="token function">ReportMsg</span><span class="token punctuation">(</span>
    <span class="token annotation builtin">@ProtoNumber</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> name<span class="token operator">:</span> String<span class="token punctuation">,</span>
    <span class="token annotation builtin">@ProtoNumber</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> content<span class="token operator">:</span> ByteArray
<span class="token punctuation">)</span>

<span class="token comment">// 定义具体的消息类型</span>
<span class="token annotation builtin">@Serializable</span>
<span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">WakeMsgContent</span><span class="token punctuation">(</span>
    <span class="token annotation builtin">@ProtoNumber</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> time<span class="token operator">:</span> Long <span class="token operator">=</span> System<span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token annotation builtin">@ProtoNumber</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> platform<span class="token operator">:</span> String <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;android&quot;</span></span><span class="token punctuation">,</span>
    <span class="token annotation builtin">@ProtoNumber</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> user<span class="token operator">:</span> String
<span class="token punctuation">)</span>

<span class="token comment">// 添加消息创建的快捷函数</span>
<span class="token keyword">fun</span> <span class="token function">newWakeMsg</span><span class="token punctuation">(</span>user<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> ReportMsg <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">ReportMsg</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;wake&quot;</span></span><span class="token punctuation">,</span> ProtoBuf<span class="token punctuation">.</span><span class="token function">encodeToByteArray</span><span class="token punctuation">(</span><span class="token function">WakeMsgContent</span><span class="token punctuation">(</span>user <span class="token operator">=</span> user<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>实例 <code>ReportClient</code>， 并做好配置</li></ol><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> reportClient <span class="token keyword">by</span> lazy <span class="token punctuation">{</span>
    <span class="token function">newReportClient</span><span class="token punctuation">(</span>
        context <span class="token operator">=</span> applicationContext<span class="token punctuation">,</span>
        listReportTransporter <span class="token operator">=</span> <span class="token function">writeBackIfFailed</span><span class="token punctuation">(</span>AppListReportTransporter<span class="token punctuation">)</span><span class="token punctuation">,</span>
        converter <span class="token operator">=</span> ReportStringMsgConverter<span class="token punctuation">,</span>
        fileBatchFileSize <span class="token operator">=</span> <span class="token number">300</span> <span class="token comment">// for test</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Transporter 是向后端传输的接口抽象，其有两种方式，一种是列表传输，一种是流式传输，这里先采用列表的方式传输</span>
<span class="token comment">// 通过 writeBackIfFailed 包裹后，传输失败可以再次写回文件，当然你也可以主动做这一步</span>
<span class="token keyword">object</span> AppListReportTransporter <span class="token operator">:</span> ListReportTransporter<span class="token operator">&lt;</span>ReportMsg<span class="token operator">&gt;</span> <span class="token punctuation">{</span>

    <span class="token keyword">override</span> <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">transport</span><span class="token punctuation">(</span>client<span class="token operator">:</span> ReportClient<span class="token operator">&lt;</span>ReportMsg<span class="token operator">&gt;</span><span class="token punctuation">,</span> batch<span class="token operator">:</span> List<span class="token operator">&lt;</span>ReportMsg<span class="token operator">&gt;</span><span class="token punctuation">,</span> usedStrategy<span class="token operator">:</span> ReportStrategy<span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token punctuation">{</span>
        batch<span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>it<span class="token punctuation">.</span>name <span class="token operator">==</span> <span class="token string-literal singleline"><span class="token string">&quot;wake&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                Log<span class="token punctuation">.</span><span class="token function">i</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;AppReport&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;wake: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">ProtoBuf<span class="token punctuation">.</span>decodeFromByteArray<span class="token operator">&lt;</span>WakeMsgContent<span class="token operator">&gt;</span><span class="token punctuation">(</span>it<span class="token punctuation">.</span>content<span class="token punctuation">)</span></span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// TODO 网络传输</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// converter 主要用于消息写入文件和从文件中读取所需要。</span>
<span class="token keyword">object</span> ReportStringMsgConverter <span class="token operator">:</span> ReportMsgConverter<span class="token operator">&lt;</span>ReportMsg<span class="token operator">&gt;</span> <span class="token punctuation">{</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">encode</span><span class="token punctuation">(</span>content<span class="token operator">:</span> ReportMsg<span class="token punctuation">)</span><span class="token operator">:</span> ByteArray <span class="token punctuation">{</span>
        <span class="token keyword">return</span> ProtoBuf<span class="token punctuation">.</span><span class="token function">encodeToByteArray</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">decode</span><span class="token punctuation">(</span>content<span class="token operator">:</span> ByteArray<span class="token punctuation">)</span><span class="token operator">:</span> ReportMsg <span class="token punctuation">{</span>
        <span class="token keyword">return</span> ProtoBuf<span class="token punctuation">.</span><span class="token function">decodeFromByteArray</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>newReportClient</code> 的完整定义为：</p><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">fun</span> <span class="token operator">&lt;</span>T<span class="token operator">&gt;</span> <span class="token function">newReportClient</span><span class="token punctuation">(</span>
    context<span class="token operator">:</span> Context<span class="token punctuation">,</span>
    listReportTransporter<span class="token operator">:</span> ListReportTransporter<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token comment">// list 类型传输</span>
    converter<span class="token operator">:</span> ReportMsgConverter<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token comment">// 数据转换</span>
    scope<span class="token operator">:</span> CoroutineScope <span class="token operator">=</span> <span class="token function">CoroutineScope</span><span class="token punctuation">(</span><span class="token operator">..</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 协程域，一般不传，主要是测试使用</span>
    streamReportTransporter<span class="token operator">:</span> StreamReportTransporter<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span><span class="token operator">?</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// 流式传输</span>
    batchInterval<span class="token operator">:</span> Long <span class="token operator">=</span> <span class="token number">5</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">,</span> <span class="token comment">// batch 上报间隔，默认 5min 上报一次</span>
    memBatchCount<span class="token operator">:</span> Int <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">,</span> <span class="token comment">// 内存 batch 缓存最大容量，默认 50</span>
    fileBatchDirName<span class="token operator">:</span> String <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;emo-report&quot;</span></span><span class="token punctuation">,</span> <span class="token comment">// 文件 batch 上报的缓存文件夹</span>
    fileBatchFileSize<span class="token operator">:</span> Long <span class="token operator">=</span> <span class="token number">150</span> <span class="token operator">*</span> <span class="token number">1024</span> <span class="token comment">// 文件上报 batch 容量，写满这个容量就会触发上报</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>上报</li></ol><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code>reportClient<span class="token punctuation">.</span><span class="token function">report</span><span class="token punctuation">(</span><span class="token function">newWakeMsg</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">,</span> ReportStrategy<span class="token punctuation">.</span>Immediately<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在执行上报动作时，就可以选择上报策略：</p><ul><li>Immediately：立即上报</li><li>MemBach： 内存 Batch 上报</li><li>FileBatch： 文件 Batch 上报</li><li>WriteBackBecauseOfFailed： 用于传输失败重新写回文件，这个和 FileBatch 的区别是它会阻止一段时间的再次传输，目前是固定的 30s，这样可以避免写文件又不断的触发传输</li></ul><h2 id="流式传输" tabindex="-1"><a class="header-anchor" href="#流式传输" aria-hidden="true">#</a> 流式传输</h2><p>如果你的 app 有长连接的功能，那么使用流式数据上报也是个不错的选择。其定义为：</p><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">interface</span> StreamReportTransporter<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span> <span class="token punctuation">{</span>

    <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">transport</span><span class="token punctuation">(</span>
        client<span class="token operator">:</span> ReportClient<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span><span class="token punctuation">,</span>
        buffer<span class="token operator">:</span> ByteArray<span class="token punctuation">,</span> <span class="token comment">// 直接给到消息的 byteArray 数据</span>
        converter<span class="token operator">:</span> ReportMsgConverter<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span><span class="token punctuation">,</span>
        usedStrategy<span class="token operator">:</span> ReportStrategy
    <span class="token punctuation">)</span>

    <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">flush</span><span class="token punctuation">(</span>client<span class="token operator">:</span> ReportClient<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span><span class="token punctuation">,</span> usedStrategy<span class="token operator">:</span> ReportStrategy<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，对于列表传输和流式传输，emo 提供了二者的相互转换包装：</p><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token comment">// 列表传输转换为流式传输</span>
<span class="token keyword">fun</span> <span class="token operator">&lt;</span>T<span class="token operator">&gt;</span> ListReportTransporter<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span><span class="token punctuation">.</span><span class="token function">wrapToStreamTransporter</span><span class="token punctuation">(</span>batchCount<span class="token operator">:</span> Int<span class="token punctuation">)</span>
<span class="token comment">// 流式传输转换为列表传输</span>
<span class="token keyword">fun</span> <span class="token operator">&lt;</span>T<span class="token operator">&gt;</span> StreamReportTransporter<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span><span class="token punctuation">.</span><span class="token function">wrapToListTransporter</span><span class="token punctuation">(</span>
    converter<span class="token operator">:</span> ReportMsgConverter<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>
<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24),o=[p];function l(c,i){return s(),a("div",null,o)}const u=n(e,[["render",l],["__file","report.html.vue"]]);export{u as default};
