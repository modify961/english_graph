import React, { useEffect, useRef } from 'react';
import RelationGraph from 'relation-graph-react';
import { loadAllWords } from '../../utils/wordGraph';


const NodeSlot = ({ node }) => {
  console.log('NodeSlot:');
  if (node.id === '2') { // if rootNode
    return (
      <div style={{ zIndex: 555, opacity: 0.5, lineHeight: '100px', width: '100px', height: '100px', color: '#000000', borderRadius: '50%', boxSizing: 'border-box', fontSize: '18px', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ width: '100%', height: (node.data.percent * 100) + '%', marginTop: ((1 - node.data.percent) * 100) + '%', background: 'linear-gradient(to bottom, #00FFFF, #FF00FF)' }}>
          {node.text}
        </div>
      </div>
    );
  }
  return (
    <div style={{ lineHeight: '80px', textAlign: 'center' }}>
      <span>{node.text}</span>
    </div>
  );
};

const GraphComponent = () => {
  const graphRef = useRef(null);

  useEffect(() => {
    showGraph();
  }, []);

  const showGraph = async () => {
    let dataInfo=await loadAllWords()
    await graphRef.current.setJsonData(dataInfo, (graphInstance) => {
      // Callback after setting the JSON data
    });
  };

  const options = {
    defaultLineShape: 1,
    layout: {
      layoutName: 'center',
      maxLayoutTimes: 3000
    },
    defaultExpandHolderPosition: 'right'
  };

  const onNodeClick = (node, _e) => {
    console.log('onNodeClick:', node.text);
    return true;
  };

  const onLineClick = (line, _link, _e) => {
    console.log('onLineClick:', line.text, line.from, line.to);
    return true;
  };

  return (
    <div style={{ height: '100%', width: '100%', margin: 0, padding: 0, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: '100%', border: '1px solid #efefef' }}>
        <RelationGraph
          ref={graphRef}
          options={options}
          nodeSlot={NodeSlot}
          onNodeClick={onNodeClick}
          onLineClick={onLineClick}
        />
      </div>
    </div>
  );
};

export default GraphComponent;
