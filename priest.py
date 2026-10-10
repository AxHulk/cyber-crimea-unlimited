import model,pickle,inspect,json
roots=model.prep('t17.tsv',True)
for r in roots:
  if r['npitems']!='0': r['gm']='True'
  if r['id']=='5935': r['reach']=True
idx={r['id']:r for r in roots}
src=inspect.getsource(model.counts)
cap={}
def D(c,g,p,L):
  code=src.replace("def counts(","def _c(").replace("done=set()","done=set();cap['d']=done")
  ns=dict(vars(model));ns['cap']=cap;exec(code,ns);ns['_c'](roots,c,g,p,L);return cap['d']
try: npcn=pickle.load(open('npcn.pkl','rb'))
except Exception as e: npcn={};print(e)
out={}
for g in(1,2):
 for p in('heaven','hell'):
  a,b,c=D(7,g,p,88),D(7,g,p,89),D(7,g,p,90)
  out[(g,p)]=(sorted(i for i in b-a if idx[i]['rec']=='True'),sorted(i for i in c-b if idx[i]['rec']=='True'))
base=out[(1,'heaven')]
print(len(base[0]),len(base[1]))
for k,v in out.items(): print(k,len(v[0]),len(v[1]),'+',set(v[0]+v[1])-set(base[0]+base[1]),'-',set(base[0]+base[1])-set(v[0]+v[1]))
rows=[]
for lv,lst in ((89,base[0]),(90,base[1])):
  for i in lst:
    r=idx[i]; rows.append(dict(lv=lv,id=i,name=model.clean(r['name']),npc=npcn.get(r['npc'],npcn.get(int(r['npc']),r['npc'])) if npcn else r['npc'],team=r['team'],pre=[model.clean(idx[x]['name']) for x in r['P'] if x in idx],lmin=r['lmin'],per=r['preperiod']))
json.dump(rows,open('priest.json','w'),ensure_ascii=False)
for x in rows: print(x)
